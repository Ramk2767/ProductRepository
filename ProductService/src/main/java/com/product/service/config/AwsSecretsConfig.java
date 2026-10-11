package com.product.service.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zaxxer.hikari.HikariDataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;

import javax.sql.DataSource;

@Configuration
public class AwsSecretsConfig {

    @Value("${aws.region}")
    private String awsRegion;

    @Value("${aws.secrets-manager.secret-name}")
    private String secretName;

    @Value("${app.database.endpoint}")
    private String databaseEndpoint;

    @Value("${app.database.name}")
    private String databaseName;

    @Bean
    public DataSource dataSource() throws Exception {

        try (SecretsManagerClient client =
                     SecretsManagerClient.builder()
                             .region(Region.of(awsRegion))
                             .build()) {

            String secretString = client.getSecretValue(
                    GetSecretValueRequest.builder()
                            .secretId(secretName)
                            .build()
            ).secretString();

            JsonNode secret =
                    new ObjectMapper().readTree(secretString);

            String username = secret.get("username").asText();
            String password = secret.get("password").asText();

            HikariDataSource ds = new HikariDataSource();

            ds.setJdbcUrl(
                    "jdbc:mysql://" + databaseEndpoint + ":3306/"
                            + databaseName + "?sslMode=VERIFY_IDENTITY"
            );
            ds.setUsername(username);
            ds.setPassword(password);
            ds.setDriverClassName("com.mysql.cj.jdbc.Driver");
            ds.setMaximumPoolSize(10);
            ds.setMinimumIdle(2);

            return ds;
        }
    }
}