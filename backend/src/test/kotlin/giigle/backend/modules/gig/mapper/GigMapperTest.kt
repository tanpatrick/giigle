package giigle.backend.modules.gig.mapper

import giigle.backend.modules.gig.CreateGigRequestCreator
import giigle.backend.modules.gig.GigCreator
import giigle.backend.modules.gig.GigEntityCreator
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class GigMapperTest {
    private val gigMapper: GigMapper = GigMapperImpl()

    @Test
    fun `verify fromGig mapping`() {
        val gig = GigCreator.create()
        val gigEntity = gigMapper.fromGig(gig)
        assertEquals(gig.date, gigEntity.date)
        assertEquals(gig.description, gigEntity.description)
        assertEquals(gig.location.address, gigEntity.location.address)
        assertEquals(gig.location.coordinates.latitude, gigEntity.location.latitude)
        assertEquals(gig.location.coordinates.longitude, gigEntity.location.longitude)
        assertEquals(gig.pay, gigEntity.pay)
        assertEquals(gig.payType.toString(), gigEntity.payType.toString())
        assertEquals(gig.title, gigEntity.title)
    }

    @Test
    fun `verify toGig mapping`() {
        val gigEntity = GigEntityCreator.create()
        val gig = gigMapper.toGig(gigEntity)
        assertEquals(gigEntity.date, gig.date)
        assertEquals(gigEntity.description, gig.description)
        assertEquals(gigEntity.location.address, gig.location.address)
        assertEquals(gigEntity.location.latitude, gig.location.coordinates.latitude)
        assertEquals(gigEntity.location.longitude, gig.location.coordinates.longitude)
        assertEquals(gigEntity.pay, gig.pay)
        assertEquals(gigEntity.payType.toString(), gig.payType.toString())
        assertEquals(gigEntity.title, gig.title)
    }

    @Test
    fun `verify toGigEntity() mapping`() {
        val request = CreateGigRequestCreator.create()
        val gigEntity = gigMapper.toGigEntity(request)
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
