import { useQuery } from "@tanstack/react-query"
import { getCvFeedback } from "@/api/cv-feedback-api"

export function useCvFeedback(page: number, pageSize: number) {
	return useQuery({
		queryKey: ["cvFeedback", page, pageSize],
		queryFn: () =>
			getCvFeedback({
				page,
				page_size: pageSize,
			}),
		staleTime: 1000 * 60 * 5,
	})
}