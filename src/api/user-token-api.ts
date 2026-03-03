import axiosClient from "@/utils/axios"
import { ENDPOINT } from "@/utils/api-constants"

export const getUserTokenApi = async (): Promise<{ total_tokens: number }> => {
	const response = await axiosClient.get(`${ENDPOINT.userToken}/`).then((res) => res.data);
	return response;
}