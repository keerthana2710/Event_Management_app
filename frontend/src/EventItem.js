import React, { useEffect, useState } from 'react';
import moment from 'moment';

const EventItem = ({ event, onEventDelete, onToggleReminder, onEventEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(event.title);
    const [editedDate, setEditedDate] = useState(moment(event.date).format("YYYY-MM-DD"));

    useEffect(() => {
        // Check if the event is today and has a reminder
        const today = new Date();
        const eventDate = new Date(event.date);

        today.setHours(0, 0, 0, 0);
        eventDate.setHours(0, 0, 0, 0);

        if (today.getTime() === eventDate.getTime() && event.reminder) {
            alert(`Today is the day of the event: ${event.title}`);
        }
    }, [event]);

    const handleEditClick = () => setIsEditing(true);
    const handleSaveClick = () => {
        onEventEdit(event._id, { title: editedTitle, date: editedDate });
        setIsEditing(false);
    };
    const handleCancelClick = () => {
        setEditedTitle(event.title);
        setEditedDate(moment(event.date).format("YYYY-MM-DD"));
        setIsEditing(false);
    };

    return (
        <div className="event-card">
            {event.reminder && <p className='rem-para'>{event.reminder ? "Reminder On" : ""}</p>}
            <div className="event-info">
    {isEditing ? (
        <>
            <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
            <input type="date" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} />
        </>
    ) : (
        <>
            <h3 className="event-title">{event.title}</h3>
            <p>{event.description}</p>
            <h4>{event.location}</h4>
            <p>Weather: {event.weather || 'No weather data available'}</p>
            <hr />
            <span className="event-date">
                <span style={{ fontWeight: "700" }}>Event On:</span>
                {moment(event.date).add(1, 'days').calendar()}
            </span>
        </>
    )}
</div>

            <div className="event-actions">
                {isEditing ? (
                    <>
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button className='btn rem-btn' onClick={() => onToggleReminder(event._id)}>
                            {event.reminder ? 'Disable Reminder' : 'Enable Reminder'}
                        </button>
                        <button className='btn delete-btn' onClick={() => onEventDelete(event._id)}>Delete</button>
                        <button className='btn edit-btn' onClick={handleEditClick}>Edit</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default EventItem;
