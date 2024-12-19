import { Topico } from "../perfil/perfil.definitions"

export interface TopicoRespuestas {
  topico: Topico
  respuestas: Respuesta[]
}


export interface Respuesta {
  id: number
  mensaje: string
  fechaCreacion: string
  solucion: string
  autor: Autor
}

export interface Autor {
  nombre: string
  correo: string
}
