/**
 * External dependencies.
 */
import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import {
	Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    __experimentalText as Text,
    __experimentalHeading as Heading,
} from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';

/**
 * Styles.
 */
import './editor.scss';

const AccordionItem = ( {
	attributes,
	setAttributes,
	onMoveUp,
	onMoveDown,
	onRemove,
	removeBtnText,
	moveUpText,
	moveDownText,
	placeholderTitle,
	placeholderContent,
} ) => {
    return (
		<CardBody>
			<RichText
				tagName="p"
				value={ attributes.title }
				onChange={ ( value ) => setAttributes( { title: value } ) }
				placeholder={ placeholderTitle }
			/>
			<RichText
				tagName="p"
				value={ attributes.content }
				onChange={ ( value ) => setAttributes( { content: value } ) }
				placeholder={ placeholderContent }
			/>
			<div className="remove-card">
				<Button
					icon="arrow-up-alt2"
					label={ moveUpText }
					onClick={ onMoveUp }
				/>
				<Button
					icon="arrow-down-alt2"
					label={ moveDownText }
					onClick={ onMoveDown }
				/>
				<Button
					icon="trash"
					label={ removeBtnText }
					onClick={ onRemove }
				/>
			</div>
		</CardBody>
    );
};

/**
 * Use the `AccordionControl` component to get array of accordion items data.
 *
 * @param {Object}   props           Component properties.
 * @param {Object}   props.labels    Component labels string object.
 * @param {string}   props.className Component class.
 * @param {array}    props.values    Component values.
 * @param {Function} props.onChange  Component onChange function.
 * @return {ReactNode} - Component.
 */
const AccordionControl = ( {
	labels,
	className,
	values,
	onChange,
} ) => {
	const { label, addBtnText } = labels;
	const [ accordions, setAccordions ] = useState( values || [] );

	const addAccordion = () => {
		const newItem = { id: Date.now(), title: '', content: '' };
		setAccordions( [ ...accordions, newItem ] );
	};

	const updateAccordion = ( index, newAttributes ) => {
		const newItems = accordions.map( ( item, i ) => ( i === index ? { ...item, ...newAttributes } : item ) );
		setAccordions( newItems );
	};

	const removeAccordion = ( index ) => {
		const newItems = accordions.filter( ( _, i ) => i !== index );
		setAccordions( newItems );
	};

	const swapAccordions = ( currentIndex, direction = 'up' ) => {
		const newIndex       = currentIndex + ( 'up' === direction ? ( -1 ) : 1 );
		let movedItem        = accordions.find( ( item, index ) => index === currentIndex );
		const remainingItems = accordions.filter( ( item, index ) => index !== currentIndex );

		// Swap item inner indexes.
		movedItem.index = newIndex;
		const remainingItemsModifyIndex = remainingItems.map( item => {

			// if remainingItems index match with newIndex, swap item
			if ( item.index === newIndex ) {
				return { ...item, index: currentIndex };
			}

			// otherwise return the object as is
			return item;
		} );

		const reorderedItems = [
			...remainingItemsModifyIndex.slice( 0, newIndex ),
			movedItem,
			...remainingItemsModifyIndex.slice( newIndex )
		];
		setAccordions( reorderedItems );
	};

	useEffect( () => {
		onChange( accordions );
	}, [ accordions ] );

	const classNames = [ "ks-accordion-control", className ].filter( ( i ) => i ).join( " " );

	return (
		<div className={ classNames }>
			<Card>
				{ label &&(
					<CardHeader>
						<Heading level={ 4 }>{ label }</Heading>
					</CardHeader>
				) }
				{ accordions.map( ( item, index ) => (
					<AccordionItem
						{...labels}
						key={ item.id }
						attributes={ item }
						setAttributes={ ( newAttributes ) => updateAccordion( index, newAttributes ) }
						onMoveUp={ () => swapAccordions( index, 'up' ) }
						onMoveDown={ () => swapAccordions( index, 'down' ) }
						onRemove={ () => removeAccordion( index ) }
					/>
				) ) }
				<CardFooter>
					<Button variant='primary' onClick={ addAccordion }>
						{ addBtnText }
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

AccordionControl.propTypes = {
	className: PropTypes.string,
	labels: PropTypes.object,
	values: PropTypes.array,
	onChange: PropTypes.func.isRequired
};

AccordionControl.defaultProps = {
	attributes: [],
	values: [],
	labels: {
		label: '',
		addBtnText: 'Add Accordion',
		removeBtnText: 'Remove Accordion',
		moveUpText: 'Move Up',
		moveDownText: 'Move Down',
		placeholderTitle: 'Enter Accordion Title...',
		placeholderContent: 'Enter Accordion Content...'
	}
};

export default AccordionControl;