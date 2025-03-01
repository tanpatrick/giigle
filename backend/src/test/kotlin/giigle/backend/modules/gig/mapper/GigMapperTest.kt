package giigle.backend.modules.gig.mapper

import giigle.backend.modules.gig.CreateGigRequestCreator
import giigle.backend.modules.gig.GigCreator
import giigle.backend.modules.gig.GigEntityCreator
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import kotlin.test.assertEquals

class GigMapperTest {
    private val mapper: GigMapper = GigMapperImpl()

    @Test
    fun `verify modelToEntity() mapping`() {
        val gig = GigCreator.create()
        val gigEntity = mapper.modelToEntity(gig)

        assertEquals(gig.date, gigEntity.date)
        assertEquals(gig.description, gigEntity.description)
        assertEquals(gig.id, gigEntity.id)
        assertEquals(gig.location.address, gigEntity.location.address)
        assertEquals(gig.location.coordinates.latitude, gigEntity.location.latitude)
        assertEquals(gig.location.coordinates.longitude, gigEntity.location.longitude)
        assertEquals(gig.pay, gigEntity.pay)
        assertEquals(gig.payType.toString(), gigEntity.payType.toString())
        assertEquals(gig.title, gigEntity.title)
    }

    @Test
    fun `verify entityToModel() mapping`() {
        val gigEntity = GigEntityCreator.create()
        val gig = mapper.entityToModel(gigEntity)

        assertEquals(gigEntity.date, gig.date)
        assertEquals(gigEntity.description, gig.description)
        assertEquals(gigEntity.id, gig.id)
        assertEquals(gigEntity.location.address, gig.location.address)
        assertEquals(gigEntity.location.latitude, gig.location.coordinates.latitude)
        assertEquals(gigEntity.location.longitude, gig.location.coordinates.longitude)
        assertEquals(gigEntity.pay, gig.pay)
        assertEquals(gigEntity.payType.toString(), gig.payType.toString())
        assertEquals(gigEntity.title, gig.title)
    }

    @Test
    fun `verify createModelToEntity() mapping`() {
        val request = CreateGigRequestCreator.create()
        val gigEntity = mapper.createModelToEntity(request)

        assertThrows<UninitializedPropertyAccessException> { gigEntity.id }
        assertEquals(request.date, gigEntity.date)
        assertEquals(request.description, gigEntity.description)
        assertEquals(request.location.address, gigEntity.location.address)
        assertEquals(request.location.coordinates.latitude, gigEntity.location.latitude)
        assertEquals(request.location.coordinates.longitude, gigEntity.location.longitude)
        assertEquals(request.pay, gigEntity.pay)
        assertEquals(request.payType.toString(), gigEntity.payType.toString())
        assertEquals(request.title, gigEntity.title)
    }
}
