package giigle.backend.modules.gig.entity

import giigle.backend.core.entity.BaseEntity
import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.FetchType
import jakarta.persistence.OneToOne
import jakarta.persistence.Table
import java.math.BigDecimal
import java.time.LocalDate

@Entity
@Table(name = "gigs")
class GigEntity(
    var date: LocalDate,
    var description: String,
    @OneToOne(
        cascade = [CascadeType.ALL],
        fetch = FetchType.LAZY,
        mappedBy = "gig",
        optional = false,
    )
    var location: GigLocationEntity,
    @Column(precision = 15, scale = 2)
    var pay: BigDecimal,
    @Enumerated(EnumType.STRING)
    var payType: PayType,
    var title: String,
) : BaseEntity()

enum class PayType(
    val value: String,
) {
    FIXED("FIXED"),
    HOURLY("HOURLY"),
}
