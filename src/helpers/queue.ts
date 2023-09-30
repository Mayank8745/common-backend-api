import Bull, { Queue, QueueOptions } from "bull";

const queues = new Map();

export const bullQueue = (queueName: string, options: QueueOptions = {}): Queue => {
    const queue = new Bull(queueName, options);
    queues.set(queueName, queue);
    return queue;
}

export const getQueue = (queueName: string, options: QueueOptions = {}): Queue => {
    if (!queues.get(queueName)) {
        queues.set(queueName, new Bull(queueName, options));
    }
    return queues.get(queueName);
}

export const allQueues = (): Map<string, Queue> => {
    return queues;
}