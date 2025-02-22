package giggle.backend.core.service

interface CrudService<T, S, R> {
    fun create(request: T): S

    fun delete(id: String): Unit

    fun findAll(): R

    fun findById(id: String): S
}
