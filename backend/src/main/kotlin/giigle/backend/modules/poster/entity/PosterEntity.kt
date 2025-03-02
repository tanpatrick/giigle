package giigle.backend.modules.poster.entity

import giigle.backend.core.entity.BaseEntity
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.Table

@Entity
@Table(name = "posters")
class PosterEntity(
    var name: String,
    @Enumerated(EnumType.STRING)
    var type: PosterType,
    var username: String,
) : BaseEntity()

enum class PosterType(
    val value: String,
) {
    COMPANY("COMPANY"),
    PERSON("PERSON"),
}
