import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

allOpen {
    annotation("jakarta.persistence.Entity")
    annotation("jakarta.persistence.Embeddable")
    annotation("jakarta.persistence.MappedSuperclass")
}

configure<SourceSetContainer> {
    java.sourceSets {
        named("main") {
            java.srcDirs(
                "${layout.buildDirectory.get()}/generated/src/main/java",
            )
        }
    }
}

dependencies {
    developmentOnly("org.springframework.boot:spring-boot-devtools")

    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")

    // mapper
    annotationProcessor("org.mapstruct:mapstruct-processor:1.6.3")
    implementation("org.mapstruct:mapstruct:1.6.3")
    kapt("org.mapstruct:mapstruct-processor:1.6.3")

    // database
    implementation("org.postgresql:postgresql")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")

    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.7.0")

    implementation("org.springframework.boot:spring-boot-starter-web")

    // testing
    testImplementation("com.h2database:h2")
    testImplementation("com.ninja-squad:springmockk:4.0.2")
    testImplementation("io.mockk:mockk:1.13.16")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(module = "mockito-core")
    }

    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

group = "giggle"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

kotlin {
    compilerOptions {
        freeCompilerArgs.addAll("-Xjsr305=strict")
    }
}

openApiGenerate {
    apiPackage.set("giigle.generated.api")
    modelPackage.set("giigle.generated.model")

    configOptions.set(
        mapOf(
            "annotationLibrary" to "swagger2",
            "documentationProvider" to "springdoc",
            "enumPropertyNaming" to "UPPERCASE",
            "exceptionHandler" to "false",
            "interfaceOnly" to "true",
            "omitGradleWrapper" to "false",
            "openApiNullable" to "false",
            "requestMappingMode" to "api_interface",
            "useBeanValidation" to "false",
            "useSpringController" to "true",
            "useSpringBoot3" to "true",
            "useTags" to "true",
        ),
    )
    generatorName.set("spring")
    inputSpec.set("$rootDir/api_specs/api.yaml")
    outputDir.set("${layout.buildDirectory.get()}/generated")
}

plugins {
    val kotlinVersion = "1.9.25"

    kotlin("jvm") version kotlinVersion
    kotlin("kapt") version kotlinVersion
    kotlin("plugin.jpa") version kotlinVersion
    kotlin("plugin.spring") version kotlinVersion

    id("com.diffplug.spotless") version "7.0.2"
    id("io.spring.dependency-management") version "1.1.7"
    id("org.jetbrains.kotlinx.kover") version "0.9.1"
    id("org.openapi.generator") version "7.10.0"
    id("org.springframework.boot") version "3.4.3"
}

repositories {
    mavenCentral()
}

spotless {
    val ktlintVersion = "1.5.0"

    kotlin {
        ktlint(ktlintVersion)
        target("src/**/*.kt")
    }

    kotlinGradle {
        target("*.gradle.kts")
        ktlint(ktlintVersion)
    }
}

tasks.bootJar {
    archiveFileName.set("${project.name}.jar")
}

tasks.withType<JavaCompile> {
    dependsOn("openApiGenerate")
}

tasks.withType<KotlinCompile> {
    mustRunAfter("openApiGenerate")
}

tasks.withType<Test> {
    useJUnitPlatform()
    finalizedBy("koverHtmlReport", "koverXmlReport")
}
