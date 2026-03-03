import axiosClient from "@/utils/axios"
import type { User } from "@/models/User";
import { ENDPOINT } from "@/utils/api-constants"

export const loginApi = async (
	{ auth_code }: { auth_code: string }
): Promise<{ user: User, token: string }> => {
	const response = await axiosClient
		.post(`${ENDPOINT.auth}/login`, { auth_code })
		.then((res) => res.data);

	return response;
}

export const getGoogleConfigApi = async (): Promise<{ client_id: string }> => {
	const response = await axiosClient
		.get(`${ENDPOINT.auth}/google/config`)
		.then((res) => res.data);

	return response;
}