import { useQuery } from "@tanstack/react-query";
import { getStudentLessonsRequest } from "../services/studentLessons.service";

export const useStudentLessons = (filters = {}) => {
    return useQuery({
        queryKey: ["student-lessons", filters],
        queryFn: () => getStudentLessonsRequest(filters),
        staleTime: 5 * 60 * 1000, // cache 5 minutes
        refetchOnWindowFocus: false,
    });
};
