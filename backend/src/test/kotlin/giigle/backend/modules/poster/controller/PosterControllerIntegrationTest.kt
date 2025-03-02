package giigle.backend.modules.poster.controller

import giigle.backend.modules.poster.CreatePosterRequestCreator
import giigle.backend.modules.poster.repository.PosterRepository
import giigle.backend.modules.poster.service.PosterService
import giigle.generated.model.Poster
import giigle.generated.model.PosterResponse
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
class PosterControllerIntegrationTest {
    @Autowired
    private lateinit var restTemplate: TestRestTemplate

    @Autowired
    private lateinit var repository: PosterRepository

    @Autowired
    private lateinit var service: PosterService

    @BeforeEach
    fun cleanUp() {
        repository.deleteAll()
    }

    @Test
    fun `should create a poster successfully`() {
        val request = CreatePosterRequestCreator.create()

        val response = restTemplate.postForEntity("/posters", request, Poster::class.java)
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(response.body).isNotNull
    }

    @Test
    fun `should return poster by id`() {
        val poster = service.create(CreatePosterRequestCreator.create())

        val response = restTemplate.getForEntity("/posters/${poster.id}", Poster::class.java)
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)
    }

    @Test
    fun `should return posters list`() {
        service.create(CreatePosterRequestCreator.create())

        val response = restTemplate.getForEntity("/posters", PosterResponse::class.java)
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(response.body!!.posters).hasSize(1)
    }
}
