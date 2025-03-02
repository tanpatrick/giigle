package giigle.backend.modules.poster.mapper

import giigle.backend.modules.poster.CreatePosterRequestCreator
import giigle.backend.modules.poster.PosterCreator
import giigle.backend.modules.poster.PosterEntityCreator
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows

class PosterMapperTest {
    private val mapper: PosterMapper = PosterMapperImpl()

    @Test
    fun `verify modelToEntity() mapping`() {
        val poster = PosterCreator.create()
        val posterEntity = mapper.modelToEntity(poster)

        assertEquals(poster.id, posterEntity.id)
        assertEquals(poster.name, posterEntity.name)
        assertEquals(poster.username, posterEntity.username)
    }

    @Test
    fun `verify entityToModel() mapping`() {
        val posterEntity = PosterEntityCreator.create()
        val poster = mapper.entityToModel(posterEntity)
        assertEquals(posterEntity.name, poster.name)
        assertEquals(posterEntity.username, poster.username)
    }

    @Test
    fun `verify createModelToEntity() mapping`() {
        val request = CreatePosterRequestCreator.create()
        val posterEntity = mapper.createModelToEntity(request)

        assertThrows<UninitializedPropertyAccessException> { posterEntity.id }
        assertEquals(request.name, posterEntity.name)
        assertEquals(request.username, posterEntity.username)
    }
}
