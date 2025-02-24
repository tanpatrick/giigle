package giigle.backend.modules.gig.entity

import giigle.backend.core.entity.BaseEntity
import jakarta.persistence.Entity
import jakarta.persistence.JoinColumn
import jakarta.persistence.MapsId
import jakarta.persistence.OneToOne
import jakarta.persistence.Table

@Entity
@Table(name = "gig_locations")
class GigLocationEntity(
    var address: String,
    var latitude: Double,
    var longitude: Double,
) : BaseEntity() {
    @JoinColumn(name = "id")
    @OneToOne
    @MapsId
    lateinit var gig: GigEntity
}
