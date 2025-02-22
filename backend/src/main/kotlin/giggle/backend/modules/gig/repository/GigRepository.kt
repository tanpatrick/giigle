package giggle.backend.modules.gig.repository

import giggle.backend.core.repository.BaseRepository
import giggle.backend.modules.gig.entity.GigEntity
import org.springframework.data.jpa.repository.EntityGraph
import java.util.Optional

interface GigRepository : BaseRepository<GigEntity> {
    @EntityGraph(attributePaths = ["location"])
    override fun findAll(): List<GigEntity>

    @EntityGraph(attributePaths = ["location"])
    override fun findById(id: String): Optional<GigEntity>
}
