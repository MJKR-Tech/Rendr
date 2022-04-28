import logger
from threading import Thread

LOG = logger.getLogger(__name__)

class Worker(Thread):
    MAX_DIGIT_PAD = 4

    def __init__(self, id, action, container, is_logging):
        Thread.__init__(self)
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
    if filtered_times:
        average_time = round(sum(filtered_times) / len(filtered_times), 5)
        LOG.info(f"AVERAGE - {job.__name__} : {average_time} s")
    return filtered_times
