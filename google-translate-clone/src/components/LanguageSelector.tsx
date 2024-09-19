import { Form } from "react-bootstrap";
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants";
import { type FC } from "react";
import { FromLanguage, Language, SectionType } from "../types.d";

// interface Props {
//     onChange: (language: Language) => void
// }

// Mejor forma para tipados complejos, requiere estas props en el tag
type Props = 
    | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
    | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

export const LanguageSelector: FC<Props> = ({ onChange, type, value }) => {

    // Tipado: Se le indica que es un changeEvent de un elemento Select
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language)
    }

    // Con Object.entries se saca la 'key' y el 'value' de un objeto
    return(
        <Form.Select onChange={handleChange} aria-label="Selecciona el idioma" value={value}>
            {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                <option key={key} value={key}>
                    {literal}
                </option>
            ))}
        </Form.Select>
    )
}