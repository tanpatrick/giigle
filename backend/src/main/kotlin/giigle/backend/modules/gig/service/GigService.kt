package giigle.backend.modules.gig.service

import giigle.backend.core.service.CrudService
import giigle.backend.modules.gig.entity.GigEntity
import giigle.backend.modules.gig.entity.GigLocationEntity
import giigle.backend.modules.gig.entity.PayType
import giigle.backend.modules.gig.repository.GigRepository
import giigle.generated.model.Coordinates
import giigle.generated.model.CreateGigRequest
import giigle.generated.model.Gig
import giigle.generated.model.GigLocation
import giigle.generated.model.GigResponse
import giigle.generated.model.PayTypeEnum
import org.springframework.stereotype.Service

@Service
class GigService(
    private val repository: GigRepository,
) : CrudService<CreateGigRequest, Gig, GigResponse> {
    override fun create(request: CreateGigRequest): Gig {
        val entity = request.toEntity()
        return repository.save(entity).toGig()
    }

    override fun delete(id: String) {
        repository.deleteById(id)
    }

    override fun findAll(): GigResponse {
        val gigs =
            repository
                .findAll()
                .map { gig -> gig.toGig() }

        return GigResponse()
            .gigs(gigs)
    }

    override fun findById(id: String): Gig =
        repository
            .findById(id)
            .map { gig -> gig.toGig() }
            .orElseThrow()

    internal fun CreateGigRequest.toEntity(): GigEntity {
        val gig =
            GigEntity(
                date = this.date,
                description = this.description,
                location = this.location.toEntity(),
                pay = this.pay,
                payType = PayType.valueOf(this.payType.value),
                title = this.title,
            )

        gig.location.gig = gig

        return gig
    }

    internal fun GigEntity.toGig(): Gig =
        Gig()
            .date(this.date)
            .description(this.description)
            .id(this.id)
            .location(this.location.toGigLocation())
            .pay(this.pay)
            .payType(PayTypeEnum.valueOf(this.payType.value))
            .title(this.title)

    internal fun GigLocation.toEntity(): GigLocationEntity =
        GigLocationEntity(
            address = this.address,
            latitude = this.coordinates.latitude,
            longitude = this.coordinates.longitude,
        )

    internal fun GigLocationEntity.toGigLocation(): GigLocation =
        GigLocation()
            .address(this.address)
            .coordinates(
                Coordinates()
                    .latitude(this.latitude)
                    .longitude(this.longitude),
            )
}
