import logger
import pandas
import tests
import workers

LOG = logger.getLogger(__name__)

class StressTester:
    def __init__(self, run_count = 10, runs_parallel = True, is_logging = True):
        self.template_ids_to_keep = set()
        self.run_count = run_count
        self.is_logging = is_logging
        self.runs_parallel = runs_parallel
        self.results = dict()

    def log(self, message):
        if (self.is_logging): LOG.info(message)

    def prepare(self):
        self.log("Finding templates before tests to preserve")
        self.template_ids_to_keep |= tests.get_current_template_ids()
        self.log(f"Found {len(self.template_ids_to_keep)} templates before running")

    def clean(self):
        self.log("Cleaning up tests")
        templates_to_throw = tests.get_current_template_ids() - self.template_ids_to_keep
        self.log(f"Throwing {len(templates_to_throw)} templates")
        [tests.delete_template_id(id) for id in templates_to_throw]

    def run(self):
        self.log("Running test connection")
        tests.test_connection()

        self.log("Running tests")
        self.prepare()
        for job in tests.getAllTests():
            times = workers.test_with_workers(job, self.run_count, self.runs_parallel, self.is_logging)
            self.results[job.__name__] = times
        self.clean()

    def write(self, excel_file):
        self.log(f"Writing to {excel_file}")
        dataframe = pandas.DataFrame(self.results)
        dataframe.to_excel(excel_file, sheet_name = "output", index = False)
