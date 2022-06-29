import axios from "axios"

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
      try {
        console.log("executing Axios ",data )
      const result = await axios({ url: baseUrl + url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
        let err = axiosError
        if (err.status === 404) {
          console.log("empty")
          return{data:[]}
        }
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
        data:[]
      }
    }
  }