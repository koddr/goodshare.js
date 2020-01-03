export interface TaskEvent {
  kind:
    'parseHTML' |
    'styleLayout' |
    'paintCompositeRender' |
    'scriptParseCompile' |
    'scriptEvaluation' |
    'garbageCollection' |
    'other'
  /**
   * Monotonic start time in milliseconds
   */
  startTime: number
  /**
   * Monotonic end time in milliseconds
   */
  endTime: number
  /**
   * Task duration in milliseconds, a.k.a. "wall time"
   */
  duration: number
  /**
   * Time spent in the task at the current level of the task tree
   */
  selfTime: number
  /**
   * Original trace event object associated with the task
   */
  event: object
  /**
   * An array of child tasks
   */
  children: TaskEvent[]
  /**
   * A parent task if anya parent task if any
   */
  parent?: TaskEvent
}
