package giigle.backend.modules.poster.service

import giigle.backend.modules.poster.CreatePosterRequestCreator
import giigle.backend.modules.poster.repository.PosterRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles

@ActiveProfiles("integration")
@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.NONE,
)
class PosterServiceIntegrationTest {
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
        val poster = service.create(CreatePosterRequestCreator.create())
        assertThat(poster).isNotNull

        val entity =
            repository
                .findById(poster.id)
                .get()

        assertThat(entity.name).isEqualTo(poster.name)
        assertThat(entity.username).isEqualTo(poster.username)
    }

    @Test
    fun `should delete a poster by id`() {
        val poster = service.create(CreatePosterRequestCreator.create())

        service.delete(poster.id)
        assertThat(repository.existsById(poster.id)).isFalse
    }

    @Test
    fun `should return poster by id`() {
        val poster = service.create(CreatePosterRequestCreator.create())

        val result = service.findById(poster.id)
        assertThat(result).isNotNull
    }

    @Test
    fun `should return posters list`() {
        service.create(CreatePosterRequestCreator.create())

        val result = service.findAll()
        assertThat(result).isNotNull
        assertThat(result.posters).hasSize(1)
    }
}
