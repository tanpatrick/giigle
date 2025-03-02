package giigle.backend.modules.gig

import giigle.backend.modules.gig.entity.GigEntity
import giigle.backend.modules.gig.entity.GigLocationEntity
import giigle.backend.modules.gig.entity.PayType
import giigle.generated.model.Coordinates
import giigle.generated.model.CreateGigRequest
import giigle.generated.model.Gig
import giigle.generated.model.GigLocation
import giigle.generated.model.PayTypeEnum
import java.math.BigDecimal
import java.time.LocalDate

object CreateGigRequestCreator {
    fun create(
        date: LocalDate = LocalDate.now(),
        description: String = "Gig description",
        location: GigLocation = GigLocation("Gig address", Coordinates(1.0, 2.0)),
        pay: BigDecimal = BigDecimal.valueOf(100),
        payType: PayTypeEnum = PayTypeEnum.FIXED,
        title: String = "Gig title",
    ): CreateGigRequest =
        CreateGigRequest()
            .date(date)
            .description(description)
            .location(location)
            .pay(pay)
            .payType(payType)
            .title(title)
}

object GigCreator {
    private val base = CreateGigRequestCreator.create()

    fun create(
        date: LocalDate = base.date,
        description: String = base.description,
        location: GigLocation = base.location,
        id: String = "123",
        pay: BigDecimal = base.pay,
        payType: PayTypeEnum = base.payType,
        title: String = base.title,
    ): Gig =
        Gig()
            .date(date)
            .description(description)
            .id(id)
            .location(location)
            .pay(pay)
            .payType(payType)
            .title(title)
}

object GigEntityCreator {
    private val base = GigCreator.create()

    fun create(
        date: LocalDate = base.date,
        description: String = base.description,
        location: GigLocation = base.location,
        id: String = base.id,
        pay: BigDecimal = base.pay,
        payType: PayTypeEnum = base.payType,
        title: String = base.title,
    ): GigEntity =
        GigEntity(
            date = date,
            description = description,
            location =
                GigLocationEntity(
                    address = location.address,
                    latitude = location.coordinates.latitude,
                    longitude = location.coordinates.longitude,
                ),
            pay = pay,
            payType = PayType.valueOf(payType.value),
            title = title,
        ).apply {
            this.id = id
        }
}
