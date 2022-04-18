from stress import StressTester

def run_stresser():
    # DEFAULTS: run_count = 10, runs_parallel = True, is_logging = True
    stress_tester = StressTester(runs_parallel = False, is_logging = False) 
    stress_tester.run()

def main():
    run_stresser()

# run script once backend is running
if __name__ == "__main__":
    main()
