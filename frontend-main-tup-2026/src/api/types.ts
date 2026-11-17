// Lo que viaja por HTTP. Copia de los modelos de api/model/*.py del backend.

export interface LoginResponse {    // POST /login
  msg: string
  token: string
}

export interface UserSummary {      // GET /user: solo id y nombre
  id: number
  name: string
}

export interface Country {
  id: number
  name: string
}

export interface RoleSummary {
  id: number
  name: string
}

export interface UserDetail extends UserSummary {   // GET /user/{id}
  age: number
  email: string
  country: Country | null
  roles: RoleSummary[]
}

export interface UserPayload {      // body de POST /user y PATCH /user/{id}
  name: string
  age: number
  country_id: number | null
  email: string
  password: string
}

export interface Permission {
  id: number
  name: string
  description?: string | null
}

export interface RoleDetail extends RoleSummary {   // GET /role/{id}
  description: string | null
  permissions: Permission[]
}

export interface NamedPayload {     // body de roles y de permisos
  name: string
  description: string | null
}

export interface CreatedResponse {  // POST y PATCH: {"id": 7}
  id: number
}

export interface MessageResponse {  // DELETE: {"msg": "..."}
  msg: string
}
