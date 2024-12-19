export interface DataPerfil {
  nombre: string
  correo: string
  topicos: Topico[]
}

export interface Topico {
  id: number
  titulo: string
  mensaje: string
  fechaCreacion: string
  nombreCurso: string
  categoriaCurso: string
}
