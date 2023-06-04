import { TitlesContainer, Title, DescriptionText } from './HeroBanner.styles'

const HeroBanner = ({ titles }) => {
    const { title, subTitle, description } = titles;

    return (
        <TitlesContainer>
            <TitlesContainer>
                <Title>{title}</Title>
                <Title>
                    <span>{subTitle}</span>
                </Title>
            </TitlesContainer>
            <DescriptionText>{description}</DescriptionText>
        </TitlesContainer>
    )
}

export default HeroBanner;