import { Resource } from './@types/resource'
import { Report } from './@types/report'
import { TaskEvent } from './@types/taskEvent'

export declare function generatePrettyReport(resources: Resource[]): Report[]

export declare function getEventsTime(events: TaskEvent[]): number

export declare function formatTime(time: number): number
