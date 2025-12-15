import { axiosInstance } from "../constants";

export interface CreateTopicDto {
    title: string;
    description: string;
    tags: string;
}

export interface UpdateTopicDto extends Partial<CreateTopicDto> { }

export interface Topic {
    id: string;
    title: string;
    description: string;
    tags: string;
}

export class TopicsService {
    async create(data: CreateTopicDto): Promise<Topic> {
        const response = await axiosInstance.post("/topics", data);
        return response.data;
    }

    async findAll(): Promise<Topic[]> {
        const response = await axiosInstance.get("/topics");
        return response.data;
    }

    async findOne(id: string): Promise<Topic> {
        const response = await axiosInstance.get(`/topics/${id}`);
        return response.data;
    }

    async update(id: string, data: UpdateTopicDto): Promise<Topic> {
        const response = await axiosInstance.patch(`/topics/${id}`, data);
        return response.data;
    }

    async remove(id: string): Promise<void> {
        await axiosInstance.delete(`/topics/${id}`);
    }
}
