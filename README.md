# Belly-Button-Challenge
----------------------------

## Week 14 Challenge
----------------------------

*Below are the steps taken to solve the challenge:*

1. Demographics Box:
   * Read url provided in the instructions.
   * Assign metadata information from the url to a new variable.
   * Get the id for each entry in the url.
   * Use the information obtained to append the html file, referencing the "#sample-metadata" id.


----------------------------
2. Bar Chart:
   * Read url provided.
   * Assign samples information from the url to a new variable.
   * Assign otu_ids, otu_labels, and samples_values to new variables
   * Use .slice(0, 10) for xTicks, yTicks, and textLabels to get the top 10 results. 
   * Set up the bar chart by defining x and y values.
   * Use the Plotly function to draw the bar chart.


----------------------------
3. Bubble Chart:
   * Read url provided.
   * Assign samples information from the url to a new variable.
   * Assign otu_ids, otu_labels, and samples_values to new variables
   * Set up the bar chart by defining x and y values, and other properties like mode and marker. 
   * Use the Plotly function to draw the bubble chart.


----------------------------
4. Gauge Chart:
   * Read url provided.
   * Assign metadata information from the url to a new variable.
   * Define new variable washFrequency.
   * Set up the gauge chart by defining x and y values, along other properties like step colors. 
   * Use the Plotly function to draw the gaue chart.

----------------------------
### Define new functions initialize() and optionChanged() to populate drop-down menue and update the dashboard
   * Retreive names from url, and append "option" with respective information.

