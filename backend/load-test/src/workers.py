import logger
import numpy
import threading

LOG = logger.getLogger(__name__)

class Worker(threading.Thread):
    MAX_DIGIT_PAD = 4

    def __init__(self, id, action, container, is_logging):
        threading.Thread.__init__(self)
        self.id = id
        self.action = action # lambda
        self.container = container
        self.is_logging = is_logging
        
    def get_id_str(self):
        return str(self.id).rjust(Worker.MAX_DIGIT_PAD)

    def log(self, message):
        if (self.is_logging): LOG.info(message)

    def run(self):
        time = self.action() # run lambda
        self.container[self.id] = time # update container
        if (time is None): return
        self.log(f"{self.action.__name__} # {self.get_id_str()} : {'{:.5f}'.format(time)} s")

def run_workers(workers, runs_parallel):
    if not runs_parallel:
        [worker.run() for worker in workers]
        return
    # runs_parallel
    [worker.start() for worker in workers]
    [worker.join() for worker in workers]

def test_with_workers(job, counts, runs_parallel, is_logging):
    LOG.info(f"Running {counts} sets for {job.__name__}")
    times = [None for _ in range(counts)] # ensure each thread does not intersect each other

    # create and run sets
    workers = [Worker(id, job, times, is_logging) for id in range(counts)]
    run_workers(workers, runs_parallel)

    # remove none results and output avrage
    filtered_times = list(filter(lambda time: time is not None, times))
    filtered_times.sort()
    if not filtered_times: return []
    
    lower_quartile = numpy.quantile(filtered_times, 0.25)
    average_time = sum(filtered_times) / len(filtered_times)
    upper_quartile = numpy.quantile(filtered_times, 0.75)
    LOG.info(f"LOWER QUARTILE - {job.__name__} : {round(lower_quartile, 5)} s")
    LOG.info(f"AVERAGE - {job.__name__} : {round(average_time, 5)} s")
    LOG.info(f"UPPER QUARTILE - {job.__name__} : {round(upper_quartile, 5)} s")

    filtered_times.extend([lower_quartile, average_time, upper_quartile])
    return filtered_times
