# nodeKnight

A simple Knight's Tour solver.  Uses a weighted search placing priority to corners, then edges, and then everything else. Searches
clockwise starting from the 1 o'clock position for best options.

Output.txt is the result of a 38 hour run solving for all 64 starting positions, the majority of the time (> 35 hours) spent on a single 
starting position where the above heuristic was particularly sub-optimal.  Other starting positions were quite optimal finding the 
solution without any need to backtrack at all.
