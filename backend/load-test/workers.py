import logging
from threading import Thread

logging.basicConfig(
    level = logging.INFO,
    format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
LOG = logging.getLogger(__name__)

class Worker(Thread):
    def __init__(self, id, action, container, is_logging):
        Thread.__init__(self)
        self.id = id
        self.action = action # lambda
        self.container = container
        self.is_logging = is_logging
        
    def get_id_str(self):
        return str(self.id).rjust(4, "0")

    def log(self, message):
        if (self.is_logging):
            LOG.info(message)

    def run(self):
        time = self.action() # run lambda
        self.container[self.id] = time # update container
        if (time is None):
            return
        self.log(f"{self.action.__name__} # {self.get_id_str()} : {'{:.5f}'.format(time)} s")

def test_with_workers(job, counts, runs_parallel, is_logging):
    LOG.info(f"Running {counts} sets for {job.__name__}")
    times = [None for _ in range(counts)] # ensure each thread does not intersect each other

    # create and run sets -> join or seq wait
    workers = [Worker(id, job, times, is_logging) for id in range(counts)]
    if runs_parallel:
        [worker.start() for worker in workers]
        [worker.join() for worker in workers]
    else:
        for worker in workers:
            worker.start()
            worker.join()

    # remove none results and output avrage
    filtered_times = list(filter(lambda time: time is not None, times))
    if filtered_times:
        average_time = round(sum(filtered_times) / len(filtered_times), 5)
        LOG.info(f"AVERAGE - {job.__name__} : {average_time} s")
    return filtered_times
