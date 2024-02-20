import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation


# Function to rotate a vector by an angle theta (in radians)
def rotate_vector(vector, theta):
    component1 = np.array([np.cos(theta), np.sin(theta)])
    component2 = np.array([-np.sin(theta), np.cos(theta)])

    # component1 = np.array([np.sin(theta), 0])
    # component2 = np.array([0, np.cos(theta)])

    rotation_matrix = np.array(
        [
            [component1[0], component2[0]],  #
            [component1[1], component2[1]],
        ]
    )  #
    rotated_vector = np.dot(rotation_matrix, vector)
    return (rotated_vector, component1, component2)


# Function to update the plot for animation
def update(frame):
    (rotated_vector, component1, component2) = rotate_vector(original_vector, frame)
    history_x.append(rotated_vector[0])
    history_y.append(rotated_vector[1])

    ax.clear()
    ax.quiver(
        0,
        0,
        rotated_vector[0],
        rotated_vector[1],
        angles="xy",
        scale_units="xy",
        scale=1,
        color="b",
    )
    ax.quiver(
        0,
        0,
        component1[0],
        component1[1],
        angles="xy",
        scale_units="xy",
        scale=1,
        color="r",
    )
    ax.quiver(
        0,
        0,
        component2[0],
        component2[1],
        angles="xy",
        scale_units="xy",
        scale=1,
        color="r",
    )
    ax.plot(history_x, history_y, color="b")
    ax.set_xlim(-5, 5)
    ax.set_ylim(-5, 5)
    ax.set_aspect("equal", "box")

    # Adjust the x and y-axis limits for zooming out
    ax.set_xlim(-3, 3)
    ax.set_ylim(-3, 3)

    ax.grid(True)
    ax.set_title(f"Rotation Angle: {round(frame,2)} radians")


# Create a figure and axis
fig, ax = plt.subplots()

# Define the original vector
original_vector = np.array([1, 1])

# Initialize history
history_x = [0]
history_y = [0]

# Create the animation
animation = FuncAnimation(fig, update, frames=np.arange(0, np.pi * 2, 0.1), interval=50)
# update(-1)

# Show the plot
plt.show()
