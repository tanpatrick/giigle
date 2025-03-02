package giigle.backend.modules.gig.service

import giigle.backend.modules.gig.CreateGigRequestCreator
import giigle.backend.modules.gig.repository.GigRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.transaction.annotation.Transactional

@ActiveProfiles("integration")
@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.NONE,
)
@Transactional
class GigServiceIntegrationTest {
    @Autowired
    private lateinit var repository: GigRepository

    @Autowired
    private lateinit var service: GigService

    @Test
    fun `should create a gig successfully`() {
        val gig = service.create(CreateGigRequestCreator.create())
        assertThat(gig).isNotNull

        val entity =
            repository
                .findById(gig.id)
                .get()

        assertThat(entity.date).isEqualTo(gig.date)
        assertThat(entity.description).isEqualTo(gig.description)
        assertThat(entity.location.address).isEqualTo(gig.location.address)
        assertThat(entity.location.latitude).isEqualTo(gig.location.coordinates.latitude)
        assertThat(entity.location.longitude).isEqualTo(gig.location.coordinates.longitude)
        assertThat(entity.pay).isEqualTo(gig.pay)
        assertThat(entity.payType.value).isEqualTo(gig.payType.value)
        assertThat(entity.title).isEqualTo(gig.title)
    }

    @Test
    fun `should delete a gig by id`() {
        val gig = service.create(CreateGigRequestCreator.create())

        service.delete(gig.id)
        assertThat(repository.existsById(gig.id)).isFalse
    }

    @Test
    fun `should return gig by id`() {
        val gig = service.create(CreateGigRequestCreator.create())

        val result = service.findById(gig.id)
        assertThat(result).isNotNull
    }

    @Test
    fun `should return gigs list`() {
        service.create(CreateGigRequestCreator.create())

        val result = service.findAll()
        assertThat(result).isNotNull
        assertThat(result.gigs).hasSize(1)
    }
}
