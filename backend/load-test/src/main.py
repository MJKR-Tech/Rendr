import pathlib
import logger
import os
import pathlib
import stress

LOG = logger.getLogger(__name__)

def run_stresser(count, is_parallel, is_logging, output = None):
    LOG.info(f"Running {'parallel' if is_parallel else 'sequential'} with size {count}")

    # DEFAULTS: run_count = 10, runs_parallel = True, is_logging = True
    stress_tester = stress.StressTester(count, is_parallel, is_logging) 
    stress_tester.run()

    if output is not None:
        pathlib.Path("../out").mkdir(exist_ok = True)

        # lower q, avg, upper q appended as last 3 rows
        excel_file = f"{output}_{str(count).rjust(2, '0')}.xlsx"
        excel_out_path = os.path.join(os.getcwd(), "..", "out", excel_file)
        stress_tester.write(excel_out_path)

    LOG.info("Terminating single stress test")

def run_to_output(size):
    run_stresser(size, False, False, "output_seq")
    run_stresser(size, True, False, "output_par")

def run_generic(sizes):
    for size in sizes:
        run_stresser(size, False, False)
        run_stresser(size, True, False)

def main():
    # run_to_output(30)
    run_generic([10, 20, 30])

# run script once backend is running
if __name__ == "__main__":
    main()
