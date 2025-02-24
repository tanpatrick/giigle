package giigle.backend.core.entity

import giigle.backend.NZ_TIMEZONE
import jakarta.persistence.Column
import jakarta.persistence.EntityListeners
import jakarta.persistence.Id
import jakarta.persistence.MappedSuperclass
import org.hibernate.annotations.UuidGenerator
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime
import java.time.OffsetDateTime

@EntityListeners(AuditingEntityListener::class)
@MappedSuperclass
abstract class BaseEntity {
    @CreatedDate
    @Column(updatable = false, nullable = false)
    lateinit var createdAt: LocalDateTime

    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    lateinit var id: String

    @LastModifiedDate
    @Column(nullable = false)
    lateinit var modifiedAt: LocalDateTime

    val createdAtInNzTimeZone: OffsetDateTime
        get() = createdAt.atZone(NZ_TIMEZONE).toOffsetDateTime()

    val modifiedAtInNzTimeZone: OffsetDateTime
        get() = createdAt.atZone(NZ_TIMEZONE).toOffsetDateTime()
}
