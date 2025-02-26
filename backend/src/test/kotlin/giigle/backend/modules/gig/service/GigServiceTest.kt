package giigle.backend.modules.gig.service

import giigle.backend.modules.gig.CreateGigRequestCreator
import giigle.backend.modules.gig.GigEntityCreator
import giigle.backend.modules.gig.mapper.GigMapper
import giigle.backend.modules.gig.mapper.GigMapperImpl
import giigle.backend.modules.gig.repository.GigRepository
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

class GigServiceTest {
    private lateinit var gigService: GigService

    @MockK(relaxed = true)
    private lateinit var repository: GigRepository

    private val gigMapper: GigMapper = GigMapperImpl()

    @BeforeEach
    fun setUp() {
        MockKAnnotations.init(this)
        gigService = GigService(gigMapper, repository)
    }

    @Test
    fun `should create gig successfully`() {
        every { repository.save(any()) } returns GigEntityCreator.create()

        val request = CreateGigRequestCreator.create()
        val result = gigService.create(request)

        verify(exactly = 1) { repository.save(any()) }

        assertThat(result).isNotNull
        assertThat(result.date).isEqualTo(request.date)
    }

    @Test
    fun `should delete gig by id successfully`() {
        val gigId = "123"
        justRun { repository.deleteById(gigId) }

        gigService.delete(gigId)
        verify(exactly = 1) { repository.deleteById(gigId) }
    }

    @Test
    fun `should find all gigs`() {
        val gigEntity1 = GigEntityCreator.create(title = "Gig 1")
        val gigEntity2 = GigEntityCreator.create(title = "Gig 2")

        every { repository.findAll() } returns listOf(gigEntity1, gigEntity2)

        val result = gigService.findAll()
        verify(exactly = 1) { repository.findAll() }

        assertThat(result.gigs)
            .hasSize(2)
            .extracting("title")
            .containsExactly(gigEntity1.title, gigEntity2.title)
    }

    @Test
    fun `should find gig by id successfully`() {
        val entity = GigEntityCreator.create()
        every { repository.findById("123") } returns Optional.of(entity)

        val result = gigService.findById("123")
        verify(exactly = 1) { repository.findById("123") }

        assertThat(result).isNotNull
        assertThat(result.date).isEqualTo(entity.date)
    }

    @Test
    fun `should throw exception when gig is not found by id`() {
        every { repository.findById("999") } returns Optional.empty()

        assertThrows<NoSuchElementException> {
            gigService.findById("999")
        }

        verify(exactly = 1) { repository.findById("999") }
    }
}
