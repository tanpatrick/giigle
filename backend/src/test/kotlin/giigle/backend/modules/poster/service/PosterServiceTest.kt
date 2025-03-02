package giigle.backend.modules.poster.service

import giigle.backend.modules.poster.CreatePosterRequestCreator
import giigle.backend.modules.poster.PosterEntityCreator
import giigle.backend.modules.poster.mapper.PosterMapper
import giigle.backend.modules.poster.mapper.PosterMapperImpl
import giigle.backend.modules.poster.repository.PosterRepository
import io.mockk.MockKAnnotations
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.justRun
import io.mockk.verify
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import java.util.Optional

class PosterServiceTest {
    private val mapper: PosterMapper = PosterMapperImpl()

    @MockK(relaxed = true)
    private lateinit var repository: PosterRepository

    private lateinit var service: PosterService

    @BeforeEach
    fun setUp() {
        MockKAnnotations.init(this)
        service = PosterService(mapper, repository)
    }

    @Test
    fun `should create poster successfully`() {
        every { repository.save(any()) } returns PosterEntityCreator.create()

        val request = CreatePosterRequestCreator.create()
        val result = service.create(request)
        assertThat(result).isNotNull

        verify(exactly = 1) { repository.save(match { it -> it.username == request.username }) }
    }

    @Test
    fun `should delete poster by id successfully`() {
        val posterId = "123"

        every { repository.findById(posterId) } returns Optional.of(PosterEntityCreator.create())
        justRun { repository.deleteById(posterId) }

        service.delete(posterId)
        verify(exactly = 1) { repository.deleteById(posterId) }
    }

    @Test
    fun `should find all posters`() {
        val entity1 = PosterEntityCreator.create(name = "Poster 1")
        val entity2 = PosterEntityCreator.create(name = "Poster 2")

        every { repository.findAll() } returns listOf(entity1, entity2)

        val result = service.findAll()
        verify(exactly = 1) { repository.findAll() }

        assertThat(result.posters)
            .hasSize(2)
            .extracting("name")
            .containsExactly(entity1.name, entity2.name)
    }

    @Test
    fun `should find poster by id successfully`() {
        val entity = PosterEntityCreator.create()
        every { repository.findById("123") } returns Optional.of(entity)

        val result = service.findById("123")
        verify(exactly = 1) { repository.findById("123") }

        assertThat(result).isNotNull
        assertThat(result.name).isEqualTo(entity.name)
    }

    @Test
    fun `should throw exception when poster is not found by id`() {
        every { repository.findById("999") } returns Optional.empty()

        assertThrows<NoSuchElementException> {
            service.findById("999")
        }

        verify(exactly = 1) { repository.findById("999") }
    }
}
