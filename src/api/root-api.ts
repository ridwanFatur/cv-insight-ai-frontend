import axiosClient from "@/utils/axios"
import { ENDPOINT } from "@/utils/api-constants"

export const getRootApi = async (): Promise<void> => {
	const response = await axiosClient.get(ENDPOINT.root).then((res) => res.data);
	return response;
}