package giigle.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.event.ApplicationStartingEvent
import org.springframework.boot.runApplication
import org.springframework.context.ApplicationListener
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.stereotype.Component
import java.time.ZoneId
import java.util.TimeZone

@SpringBootApplication
@EnableJpaAuditingForNonTest
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}

@Component
class ApplicationInitListener : ApplicationListener<ApplicationStartingEvent> {
    override fun onApplicationEvent(event: ApplicationStartingEvent) {
        TimeZone.setDefault(TimeZone.getTimeZone(NZ_TIMEZONE))
    }
}

val NZ_TIMEZONE: ZoneId = ZoneId.of("Pacific/Auckland")

@Configuration
@EnableJpaAuditing
@Profile("!test")
annotation class EnableJpaAuditingForNonTest
