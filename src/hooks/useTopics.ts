import { useState, useEffect, useCallback } from "react";
import { TopicsService, type Topic } from "../services/topics";
import type { TopicType } from "../types/topics";

const topicsService = new TopicsService();

export function useTopics() {
    const [topics, setTopics] = useState<TopicType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchTopics = useCallback(async () => {
        try {
            setLoading(true);
            const data = await topicsService.findAll();
            const formattedTopics: TopicType[] = data.map(t => ({
                ...t,
                tags: t.tags ? t.tags.split(',').map(tag => tag.trim()) : [],
                lastUsed: undefined
            }));
            setTopics(formattedTopics);
            setError(false);
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTopics();
    }, [fetchTopics]);

    const getTopic = async (id: string): Promise<TopicType | undefined> => {
        try {
            const topic = await topicsService.findOne(id);
            if (!topic) return undefined;
            return {
                ...topic,
                tags: topic.tags ? topic.tags.split(',').map(tag => tag.trim()) : []
            };
        } catch (error) {
            console.error(error);
            return undefined;
        }
    };

    const createTopic = async (data: Omit<TopicType, 'id'>) => {
        const payload = {
            ...data,
            tags: Array.isArray(data.tags) ? data.tags.join(',') : data.tags
        };
        return await topicsService.create(payload as any);
    }

    const updateTopic = async (id: string, data: Partial<TopicType>) => {
        const payload = {
            ...data,
            tags: Array.isArray(data.tags) ? data.tags.join(',') : data.tags
        };
        return await topicsService.update(id, payload as any);
    }

    return { topics, loading, error, getTopic, createTopic, updateTopic, refetch: fetchTopics };
}
