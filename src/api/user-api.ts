import axiosClient from "@/utils/axios"
import type { User } from "@/models/User";
import { ENDPOINT } from "@/utils/api-constants"

export const getUserApi = async (): Promise<{ user: User }> => {
	const response = await axiosClient.get(`${ENDPOINT.user}/`).then((res) => res.data);
	return response;
}