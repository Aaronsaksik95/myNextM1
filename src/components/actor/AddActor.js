import React, { useState } from 'react';
import Input from '../UI/Input/Input';

const AddActor = () => {
    const [actors, setActors] = useState([]);
    
    const AddItemActor = (e) => {
        e.preventDefault();
        setActors([...actors, e.target.actor.value])
    }

    return (
        <div>
            {actors ? (
                actors.map((actor) => (
                    <p>{actor}</p>
                ))
            ) : ""
            }
            <form>
                <Input
                    type="text"
                    label="Acteur"
                    id="actor"
                    name="actor"
                    required={true}
                    onChange={e.target.value}
                />
                <input className="btn btn-black" type="button" value="Ajouter acteur" onClick={AddItemActor} />
            </form>
        </div>
    );
};

export default AddActor;