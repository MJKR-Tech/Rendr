import os
from stress import StressTester

def run_stresser(count, is_parallel, is_logging, output = None):
    # DEFAULTS: run_count = 10, runs_parallel = True, is_logging = True
    stress_tester = StressTester(count, is_parallel, is_logging) 
    stress_tester.run()
    if output is not None:
        excel_out_path = os.path.join(os.getcwd(), "out", output)
        stress_tester.write(excel_out_path)

def run_to_output():
    run_stresser(25, False, False, "output_seq.xlsx")
    print()
    run_stresser(25, True, False, "output_par.xlsx")
    print()

def run_generic():
    sizes = [5, 10, 15, 20, 25]
    for size in sizes:
        print(f"Running sequential with size {size}")
        run_stresser(size, False, False)
        print()
        print(f"Running parallel with size {size}")
        run_stresser(size, True, False)
        print()

def main():
    run_to_output()
    # run_generic()

# run script once backend is running
if __name__ == "__main__":
    main()
