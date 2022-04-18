import os
from stress import StressTester

def run_stresser(count, is_parallel, is_logging, output = None):
    # DEFAULTS: run_count = 10, runs_parallel = True, is_logging = True
    stress_tester = StressTester(count, is_parallel, is_logging) 
    stress_tester.run()
    if output is not None:
        excel_out_path = os.path.join(os.getcwd(), "out", output)
        stress_tester.write(excel_out_path)

def main():
    run_stresser(25, False, True, "output_seq.xlsx")
    run_stresser(25, True, True, "output_par.xlsx")

# run script once backend is running
if __name__ == "__main__":
    main()
