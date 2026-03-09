import axiosClient from "@/utils/axios"
import { ENDPOINT } from "@/utils/api-constants"
import type { PaginationModel } from "@/models/PaginationModel";
import type { CVFeedback } from "@/models/CVFeedback";

export const getCvFeedback = async ({
	page = 1,
	page_size = 10,
}: {
	page?: number,
	page_size?: number
}): Promise<PaginationModel<CVFeedback>> => {
	const response = await axiosClient.get(
		`${ENDPOINT.cvFeedback}/`,
		{
			params: {
				page,
				page_size
			}
		}
	);

	return response.data;
};

export const uploadCv = async ({
	file,
}: {
	file: File
}): Promise<{
	remaining_tokens: number
}> => {
	const formData = new FormData()
	formData.append("file", file)

	const response = await axiosClient.post(
		`${ENDPOINT.cvFeedback}/upload`,
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
	)

	return response.data
}