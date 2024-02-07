export interface ResponseList {
    data: Daum[]
    isError: boolean
}
  
export interface Daum {
  uuid: string,
  createAt: string
  email: string
  text: string
  updateAt: string
}
  