package giigle.backend.modules.gig.controller

import giigle.backend.modules.gig.CreateGigRequestCreator
import giigle.backend.modules.gig.repository.GigRepository
import giigle.backend.modules.gig.service.GigService
import giigle.generated.model.Gig
import giigle.generated.model.GigResponse
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpStatus
import org.springframework.test.context.ActiveProfiles

@ActiveProfiles("integration")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class GigControllerIntegrationTest {
    @Autowired
    private lateinit var restTemplate: TestRestTemplate

    @Autowired
    private lateinit var repository: GigRepository

    @Autowired
    private lateinit var service: GigService

    @BeforeEach
    fun cleanUp() {
        repository.deleteAll()
    }

    @Test
    fun `should create a gig successfully`() {
        val request = CreateGigRequestCreator.create()

        val response = restTemplate.postForEntity("/gigs", request, Gig::class.java)
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(response.body).isNotNull
    }

    @Test
    fun `should return gig by id`() {
        val gig = service.create(CreateGigRequestCreator.create())

        val response = restTemplate.getForEntity("/gigs/${gig.id}", Gig::class.java)
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)
    }

    @Test
    fun `should return gigs list`() {
        service.create(CreateGigRequestCreator.create())

        val response = restTemplate.getForEntity("/gigs", GigResponse::class.java)
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(response.body!!.gigs).hasSize(1)
    }
}
